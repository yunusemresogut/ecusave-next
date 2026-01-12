"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useLang } from "../../context/LanguageContext";
import { FaArrowLeft, FaBolt, FaTachometerAlt, FaInfoCircle } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TuningCalculator() {
  const { t } = useLang();

  const [markalar, setMarkalar] = useState([]);
  const [modeller, setModeller] = useState([]);
  const [yillar, setYillar] = useState([]);
  const [motorlar, setMotorlar] = useState([]);

  const [form, setForm] = useState({
    marka: null,
    model: null,
    yil: null,
    motor: null,
  });

  const [result, setResult] = useState(null);

  // İlk yüklemede markaları çek
  useEffect(() => {
    fetch(`${API_URL}/sorguMarkaP`)
      .then((res) => res.json())
      .then((data) => {
        const markaList = Object.entries(data).map(([id, name]) => ({
          value: id,
          label: name,
        }));

        markaList.sort((a, b) => a.label.localeCompare(b.label, "tr"));

        setMarkalar(markaList);
      });
  }, []);

  // Marka seçilince modelleri getir
  useEffect(() => {
    if (form.marka) {
      fetch(`${API_URL}/sorguModelP/${form.marka.value}`)
        .then((res) => res.json())
        .then((data) => {
          const modelList = Object.entries(data).map(([id, name]) => ({
            value: id,
            label: name,
          }));
          setModeller(modelList);
          setForm((f) => ({ ...f, model: null, yil: null, motor: null }));
          setYillar([]);
          setMotorlar([]);
        });
    }
  }, [form.marka]);

  // Model seçilince yılları getir
  useEffect(() => {
    if (form.model) {
      fetch(`${API_URL}/sorguYilAraliklarP/${form.model.value}`)
        .then((res) => res.json())
        .then((data) => {
          const yilList = Object.entries(data).map(([id, name]) => ({
            value: id,
            label: name,
          }));
          setYillar(yilList);
          setForm((f) => ({ ...f, yil: null, motor: null }));
          setMotorlar([]);
        });
    }
  }, [form.model]);

  // Yıl seçilince motorları getir
  useEffect(() => {
    if (form.yil) {
      fetch(`${API_URL}/sorguMotorCinslerP/${form.yil.value}`)
        .then((res) => res.json())
        .then((data) => {
          const motorList = Object.entries(data).map(([id, name]) => ({
            value: id,
            label: name,
          }));
          setMotorlar(motorList);
          setForm((f) => ({ ...f, motor: null }));
        });
    }
  }, [form.yil]);

  // Motor seçilince sonuç isteği
  const calculate = async () => {
    if (!form.motor) return;
    const res = await fetch(`${API_URL}/sorguBilgiP/${form.motor.value}`);
    const data = await res.json();
    setResult(data);
  };

  const reset = () => setResult(null);

  return (
    <div className="mx-auto px-6 md:px-12 max-w-7xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Sol taraf açıklama */}
        <div className="space-y-6">
          <h3 className="text-4xl md:text-5xl font-extrabold pb-4 bg-gradient-to-r from-rose-500 to-orange-600 bg-clip-text text-transparent">
            {t("tuning")}
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg md:text-xl">{t("tuningDesc")}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-orange-600 rounded-full"></div>
        </div>

        {/* Sağ taraf */}
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200">
          {!result ? (
            <>
              {/* Dropdownlar */}
              <div className="flex flex-col gap-4 mb-6">
                <Select
                  instanceId="marka"
                  options={markalar}
                  placeholder={t("marka")}
                  value={form.marka}
                  onChange={(opt) => setForm({ ...form, marka: opt })}
                  className="rounded-lg"
                />
                <Select
                  instanceId="model"
                  options={modeller}
                  placeholder={t("model")}
                  value={form.model}
                  onChange={(opt) => setForm({ ...form, model: opt })}
                  isDisabled={!form.marka}
                  className="rounded-lg"
                />
                <Select
                  instanceId="yil"
                  options={yillar}
                  placeholder={t("yil")}
                  value={form.yil}
                  onChange={(opt) => setForm({ ...form, yil: opt })}
                  isDisabled={!form.model}
                  className="rounded-lg"
                />
                <Select
                  instanceId="motor"
                  options={motorlar}
                  placeholder={t("motor")}
                  value={form.motor}
                  onChange={(opt) => setForm({ ...form, motor: opt })}
                  isDisabled={!form.yil}
                  className="rounded-lg"
                />
              </div>

              {/* Hesapla butonu */}
              <button
                onClick={calculate}
                className="w-full bg-gradient-to-r from-rose-600 to-orange-600 hover:from-orange-600 hover:to-rose-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition disabled:from-gray-400 disabled:to-gray-400"
                disabled={!form.motor}
              >
                {t("calculate")}
              </button>
            </>
          ) : (
            <div>
              {/* Geri butonu */}
              <button onClick={reset} className="flex items-center gap-2 text-rose-600 mb-6 hover:underline">
                <FaArrowLeft /> Back
              </button>

              {/* Seçimler */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="text-gray-700 font-medium">
                  {form.marka?.label} - {form.model?.label} - {form.yil?.label} - {form.motor?.label}
                </div>
              </div>

              {/* Sonuç kartı */}
              <div className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-xl space-y-6">
                {result?.data?.message?.map((item, index) => {
                  const origHP = Number(item.org_hp);
                  const chipHP = Number(item.chip_tuninghp);
                  const origNM = Number(item.org_nm);
                  const chipNM = Number(item.chip_tuning_nm);

                  const hpDiff = chipHP - origHP;
                  const hpPercent = ((hpDiff / origHP) * 100).toFixed(1);

                  const nmDiff = chipNM - origNM;
                  const nmPercent = ((nmDiff / origNM) * 100).toFixed(1);

                  const description = item.description ? JSON.parse(item.description) : {};

                  return (
                    <div key={index} className="space-y-6">
                      {/* Power & Torque */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-rose-50 rounded-xl shadow-inner hover:scale-105 transition-transform duration-300">
                          <h5 className="font-semibold mb-2 text-rose-600 flex items-center gap-2">
                            <FaBolt /> Power (HP)
                          </h5>
                          <p>
                            Original: <span className="font-bold">{origHP}</span>
                          </p>
                          <p>
                            Chip Tuning: <span className="font-bold">{chipHP}</span>
                          </p>
                          <p>
                            Difference:{" "}
                            <span className="font-bold text-green-600">
                              {hpDiff} HP ({hpPercent}%)
                            </span>
                          </p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-xl shadow-inner hover:scale-105 transition-transform duration-300">
                          <h5 className="font-semibold mb-2 text-orange-600 flex items-center gap-2">
                            <FaTachometerAlt /> Torque (Nm)
                          </h5>
                          <p>
                            Original: <span className="font-bold">{origNM}</span>
                          </p>
                          <p>
                            Chip Tuning: <span className="font-bold">{chipNM}</span>
                          </p>
                          <p>
                            Difference:{" "}
                            <span className="font-bold text-green-600">
                              {nmDiff} Nm ({nmPercent}%)
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="p-4 bg-gray-100 rounded-xl border border-gray-200 space-y-2">
                        <h5 className="font-semibold mb-2 text-gray-800 flex items-center gap-2">
                          <FaInfoCircle /> ECU & Details
                        </h5>
                        {description["Beyin Marka Modeli"] && (
                          <p>
                            <span className="font-medium">ECU: </span>
                            {description["Beyin Marka Modeli"]}
                          </p>
                        )}
                        {description["Nesil"] && (
                          <p>
                            <span className="font-medium">Generation: </span>
                            {description["Nesil"]}
                          </p>
                        )}
                        {description["Orjinal Hp"] && (
                          <p>
                            <span className="font-medium">Original HP (Detail): </span>
                            {description["Orjinal Hp"]}
                          </p>
                        )}
                        {description["Chip Tuning Hp"] && (
                          <p>
                            <span className="font-medium">Chip Tuning HP (Detail): </span>
                            {description["Chip Tuning Hp"]}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
