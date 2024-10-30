"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Question } from "@/interface/data";
import taskData from "@/data/taskData.json";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function TriviaPage() {
  const params = useParams();

  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20); // Temporizador a 20 segundos por pregunta
  const [progress, setProgress] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const filterQuestions = taskData.questions.filter(
      (task) => task.type.toLowerCase() === params.type
    );
    setQuestions(filterQuestions);
  }, [params]);

  // Manejo del temporizador y avance automático
  useEffect(() => {
    if (!isModalOpen) {
      setTimer(20); // Reinicia el temporizador en cada nueva pregunta
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            handleNextQuestion(); // Avanza automáticamente cuando el temporizador llega a 0
            return 0;
          }
        });
        setTotalTime((prevTotal) => prevTotal + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isModalOpen, currentQuestionIndex]);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correctAnswerIndex = questions[currentQuestionIndex].options.findIndex(
      (option) => option.isCorrect
    );
    setIsCorrect(index === correctAnswerIndex);
    if (index === correctAnswerIndex) {
      setScore((prevScore) => prevScore + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedAnswer(null);
      setIsCorrect(null);
      setProgress((prevProgress) => prevProgress + 1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleFinishTrivia(); // Llama al modal cuando llega a la última pregunta
    }
  };

  const handleFinishTrivia = () => {
    setIsModalOpen(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-800 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <header className="flex flex-col items-center mb-8">
          <div className="flex justify-between w-full mb-2">
            <div className="text-2xl font-bold">Puntaje: {score}</div>
            <div className="text-2xl font-bold">Tiempo: {timer}s</div>
            <div className="text-xl">
              Pregunta {progress}/{questions.length}
            </div>
          </div>

          {/* Barra de progreso del tiempo */}
          <div className="w-full bg-gray-400 h-4 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: "100%" }}
              animate={{ width: `${(timer / 20) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </header>

        {currentQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-purple-800 p-6 rounded-lg shadow-lg mb-8"
          >
            <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4 mb-8">
          {currentQuestion?.options.map((answer, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null}
              className={`p-4 text-xl font-semibold rounded-lg shadow transition-colors duration-300 ${
                selectedAnswer === index
                  ? isCorrect
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } ${selectedAnswer !== null ? "cursor-not-allowed" : ""}`}
            >
              {answer.option}
            </motion.button>
          ))}
        </div>

        {currentQuestionIndex < questions.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextQuestion}
            className="w-full p-4 text-xl font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow transition-colors duration-300"
          >
            Siguiente pregunta
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinishTrivia}
            className="w-full p-4 text-xl font-semibold bg-red-500 hover:bg-red-600 rounded-lg shadow transition-colors duration-300"
          >
            Finalizar Trivia
          </motion.button>
        )}
      </div>

      {/* Confetti Animation */}
      <AnimatePresence>
        {isModalOpen && (
          <Confetti
            width={window.innerWidth - 20}
            height={window.innerHeight - 20}
            recycle={false}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white text-purple-800 p-8 rounded-lg shadow-lg z-50 max-w-md w-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h2 className="text-2xl font-bold mb-4 text-center">¡Trivia Finalizada!</h2>
                <p className="text-lg mb-2">Tiempo Total: {totalTime} segundos</p>
                <p className="text-lg mb-2">Preguntas Resueltas: {questions.length}</p>
                <p className="text-lg mb-6">Puntaje Obtenido: {score}</p>
                <Link href="/selection">
                    <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full p-3 text-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Cerrar
                    </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
