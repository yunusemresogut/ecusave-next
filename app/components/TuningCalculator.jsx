"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useLang } from "../../context/LanguageContext";
import { FaArrowLeft } from "react-icons/fa";

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
    <div className="mx-auto px-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Sol taraf açıklama */}
        <div>
          <h3 className="text-5xl font-semibold mb-4">{t("tuning")}</h3>
          <p className="text-gray-600 leading-relaxed text-xl">{t("tuningDesc")}</p>
        </div>

        {/* Sağ taraf */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          {!result ? (
            <>
              <div className="flex flex-col gap-4 mb-6">
                <Select
                  instanceId="marka"
                  options={markalar}
                  placeholder={t("marka")}
                  value={form.marka}
                  onChange={(opt) => setForm({ ...form, marka: opt })}
                />
                <Select
                  instanceId="model"
                  options={modeller}
                  placeholder={t("model")}
                  value={form.model}
                  onChange={(opt) => setForm({ ...form, model: opt })}
                  isDisabled={!form.marka}
                />
                <Select
                  instanceId="yil"
                  options={yillar}
                  placeholder={t("yil")}
                  value={form.yil}
                  onChange={(opt) => setForm({ ...form, yil: opt })}
                  isDisabled={!form.model}
                />
                <Select
                  instanceId="motor"
                  options={motorlar}
                  placeholder={t("motor")}
                  value={form.motor}
                  onChange={(opt) => setForm({ ...form, motor: opt })}
                  isDisabled={!form.yil}
                />
              </div>
              <button
                onClick={calculate}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition disabled:bg-gray-400"
                disabled={!form.motor}
              >
                {t("calculate")}
              </button>
            </>
          ) : (
            <div>
              {/* Geri butonu */}
              <button onClick={reset} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
                <FaArrowLeft /> {t("back")}
              </button>

              {/* Seçimler */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="text-gray-700">
                  {form.marka?.label} - {form.model?.label} - {form.yil?.label} - {form.motor?.label}
                </div>
              </div>

              {/* Sonuç kartı */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
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
                    <div key={index} className="space-y-4">
                      {/* Güç ve Tork */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-semibold mb-2">Güç (HP)</h5>
                          <p>
                            Orijinal: <span className="font-medium">{origHP}</span>
                          </p>
                          <p>
                            Chip Tuning: <span className="font-medium">{chipHP}</span>
                          </p>
                          <p>
                            Fark:{" "}
                            <span className="font-medium">
                              {hpDiff} HP ({hpPercent}%)
                            </span>
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-semibold mb-2">Tork (Nm)</h5>
                          <p>
                            Orijinal: <span className="font-medium">{origNM}</span>
                          </p>
                          <p>
                            Chip Tuning: <span className="font-medium">{chipNM}</span>
                          </p>
                          <p>
                            Fark:{" "}
                            <span className="font-medium">
                              {nmDiff} Nm ({nmPercent}%)
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Diğer bilgiler */}
                      <div className="p-4 bg-gray-100 rounded-lg">
                        <h5 className="font-semibold mb-2">Beyin & Açıklama</h5>
                        {description["Beyin Marka Modeli"] && (
                          <p>
                            <span className="font-medium">Beyin: </span>
                            {description["Beyin Marka Modeli"]}
                          </p>
                        )}
                        {description["Nesil"] && (
                          <p>
                            <span className="font-medium">Nesil: </span>
                            {description["Nesil"]}
                          </p>
                        )}
                        {description["Orjinal Hp"] && (
                          <p>
                            <span className="font-medium">Orijinal HP (Detay): </span>
                            {description["Orjinal Hp"]}
                          </p>
                        )}
                        {description["Chip Tuning Hp"] && (
                          <p>
                            <span className="font-medium">Chip Tuning HP (Detay): </span>
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
