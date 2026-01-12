"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaBolt, FaTachometerAlt, FaInfoCircle } from "react-icons/fa";
import { useLang } from "../../context/LanguageContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TuningCalculator() {
  const { t } = useLang();

  const [simStarted, setSimStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [form, setForm] = useState({
    marka: null,
    model: null,
    yil: null,
    motor: null,
  });
  const [result, setResult] = useState(null);

  const [markalar, setMarkalar] = useState([]);
  const [modeller, setModeller] = useState([]);
  const [yillar, setYillar] = useState([]);
  const [motorlar, setMotorlar] = useState([]);

  // Adımlar ve başlıklar
  const steps = [
    { title: "selectBrand", desc: "Select your car brand", options: markalar },
    { title: "selectModel", desc: "Select your car model", options: modeller },
    { title: "selectYear", desc: "Select the production year", options: yillar },
    { title: "selectMotor", desc: "Select your engine type", options: motorlar },
  ];

  // Fetch marka
  useEffect(() => {
    fetch(`${API_URL}/sorguMarkaP`)
      .then((res) => res.json())
      .then((data) => {
        const markaList = Object.entries(data).map(([id, name]) => ({ value: id, label: name }));
        markaList.sort((a, b) => a.label.localeCompare(b.label, "tr"));
        setMarkalar(markaList);
      });
  }, []);

  // Fetch model
  useEffect(() => {
    if (form.marka) {
      fetch(`${API_URL}/sorguModelP/${form.marka.value}`)
        .then((res) => res.json())
        .then((data) => {
          const modelList = Object.entries(data).map(([id, name]) => ({ value: id, label: name }));
          setModeller(modelList);
          setForm((f) => ({ ...f, model: null, yil: null, motor: null }));
          setYillar([]);
          setMotorlar([]);
        });
    }
  }, [form.marka]);

  // Fetch yıl
  useEffect(() => {
    if (form.model) {
      fetch(`${API_URL}/sorguYilAraliklarP/${form.model.value}`)
        .then((res) => res.json())
        .then((data) => {
          const yilList = Object.entries(data).map(([id, name]) => ({ value: id, label: name }));
          setYillar(yilList);
          setForm((f) => ({ ...f, yil: null, motor: null }));
          setMotorlar([]);
        });
    }
  }, [form.model]);

  // Fetch motor
  useEffect(() => {
    if (form.yil) {
      fetch(`${API_URL}/sorguMotorCinslerP/${form.yil.value}`)
        .then((res) => res.json())
        .then((data) => {
          const motorList = Object.entries(data).map(([id, name]) => ({ value: id, label: name }));
          setMotorlar(motorList);
          setForm((f) => ({ ...f, motor: null }));
        });
    }
  }, [form.yil]);

  // Seçim handler
  const handleSelect = (opt) => setSelectedValue(opt);

  // İleri ve geri adımlar
  const nextStep = () => {
    if (!selectedValue) return;

    switch (currentStep) {
      case 0: setForm((f) => ({ ...f, marka: selectedValue })); break;
      case 1: setForm((f) => ({ ...f, model: selectedValue })); break;
      case 2: setForm((f) => ({ ...f, yil: selectedValue })); break;
      case 3: setForm((f) => ({ ...f, motor: selectedValue })); break;
    }

    setSelectedValue(null);

    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else calculate();
  };

  const prevStep = () => {
    if (currentStep === 0) {
      setSimStarted(false);
      setSelectedValue(null);
      setForm({ marka: null, model: null, yil: null, motor: null });
    } else {
      setCurrentStep(currentStep - 1);
      setSelectedValue(null);
    }
  };

  // Hesaplama
  const calculate = async () => {
    if (!form.motor) return;
    const res = await fetch(`${API_URL}/sorguBilgiP/${form.motor.value}`);
    const data = await res.json();
    setResult(data);
  };

  const reset = () => {
    setResult(null);
    setSimStarted(false);
    setCurrentStep(0);
    setSelectedValue(null);
    setForm({ marka: null, model: null, yil: null, motor: null });
  };

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
          {!simStarted ? (
            <div className="text-center space-y-6">
              <p className="text-gray-700 font-medium">{t("startSimulatorText")}</p>
              <button
                onClick={() => setSimStarted(true)}
                className="bg-gradient-to-r from-rose-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-orange-600 hover:to-rose-600 transition"
              >
                {t("startSimulator")}
              </button>
            </div>
          ) : !result ? (
            <div className="space-y-6">
              {/* Adım Başlığı */}
              <h4 className="font-semibold text-xl text-gray-800">{t(steps[currentStep].title)}</h4>
              <p className="text-gray-500">{t(steps[currentStep].desc)}</p>

              {/* Kartlar */}
              <div className="flex flex-wrap gap-4 mt-4">
                {steps[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt)}
                    className={`px-4 py-2 rounded-lg font-medium transition
                      ${selectedValue === opt
                        ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Navigasyon Butonları */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  className="text-gray-700 hover:text-rose-500 font-medium transition"
                >
                  ← {t("back")}
                </button>
                <button
                  onClick={nextStep}
                  disabled={!selectedValue}
                  className={`ml-auto px-5 py-2 rounded-lg font-semibold text-white shadow-md transition
                    ${selectedValue
                      ? "bg-gradient-to-r from-rose-600 to-orange-600 hover:from-orange-600 hover:to-rose-600"
                      : "bg-gray-300 cursor-not-allowed"}`}
                >
                  {currentStep === steps.length - 1 ? t("calculate") : t("continue")}
                </button>
              </div>
            </div>
          ) : (
            // Sonuç
            <div className="space-y-6">
              <button onClick={reset} className="flex items-center gap-2 text-rose-600 hover:underline">
                <FaArrowLeft /> {t("back")}
              </button>
              {/* Sonuç kartları */}
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
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-rose-50 rounded-xl shadow-inner hover:scale-105 transition-transform duration-300">
                          <h5 className="font-semibold mb-2 text-rose-600 flex items-center gap-2">
                            <FaBolt /> Power (HP)
                          </h5>
                          <p>Original: <span className="font-bold">{origHP}</span></p>
                          <p>Chip Tuning: <span className="font-bold">{chipHP}</span></p>
                          <p>Difference: <span className="font-bold text-green-600">{hpDiff} HP ({hpPercent}%)</span></p>
                        </div>

                        <div className="p-4 bg-orange-50 rounded-xl shadow-inner hover:scale-105 transition-transform duration-300">
                          <h5 className="font-semibold mb-2 text-orange-600 flex items-center gap-2">
                            <FaTachometerAlt /> Torque (Nm)
                          </h5>
                          <p>Original: <span className="font-bold">{origNM}</span></p>
                          <p>Chip Tuning: <span className="font-bold">{chipNM}</span></p>
                          <p>Difference: <span className="font-bold text-green-600">{nmDiff} Nm ({nmPercent}%)</span></p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-100 rounded-xl border border-gray-200 space-y-2">
                        <h5 className="font-semibold mb-2 text-gray-800 flex items-center gap-2">
                          <FaInfoCircle /> ECU & Details
                        </h5>
                        {description["Beyin Marka Modeli"] && <p><span className="font-medium">ECU: </span>{description["Beyin Marka Modeli"]}</p>}
                        {description["Nesil"] && <p><span className="font-medium">Generation: </span>{description["Nesil"]}</p>}
                        {description["Orjinal Hp"] && <p><span className="font-medium">Original HP (Detail): </span>{description["Orjinal Hp"]}</p>}
                        {description["Chip Tuning Hp"] && <p><span className="font-medium">Chip Tuning HP (Detail): </span>{description["Chip Tuning Hp"]}</p>}
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
