"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Question } from "@/interface/data";
import taskData from "@/data/taskData.json";
import { useParams } from "next/navigation";

export default function TriviaPage() {
  const params = useParams();

  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [progress, setProgress] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const filterQuestions = taskData.questions.filter(
      (task) => task.type.toLowerCase() === params.type
    );

    setQuestions(filterQuestions);
  }, [params]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerClick = (index: number) => {
    // Si ya hay una respuesta seleccionada, no permita otra selección
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
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimer(30);
    setProgress((prevProgress) => prevProgress + 1);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-800 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold">Score: {score}</div>
          <div className="text-2xl font-bold">Time: {timer}s</div>
          <div className="text-xl">
            Question {progress}/{questions.length}
          </div>
        </header>

        {/* Question Box */}
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

        {/* Answer Options */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {currentQuestion?.options.map((answer, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null} // Deshabilita todas las opciones después de seleccionar
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

        {/* Next Button */}
        {currentQuestionIndex < questions.length - 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextQuestion}
            className="w-full p-4 text-xl font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow transition-colors duration-300"
          >
            Siguiente pregunta
          </motion.button>
        )}
      </div>
    </div>
  );
}
