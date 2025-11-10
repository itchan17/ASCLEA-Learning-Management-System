import React from 'react';
import Monitoring from '../../Components/CheatingMitigation/CV_Indicator';
import TabSwitchingDetector from '../../Components/CheatingMitigation/TabSwitchingDetector';

const MockQuiz = () => {
    const[enabled, setEnabled] = React.useState(true);

  const questions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    },
    {
      id: 3,
      question: 'What is the largest mammal?',
      options: ['Elephant', 'Giraffe', 'Blue Whale', 'Rhino'],
    },
  ];

  return (
    <>
    <TabSwitchingDetector />
    {enabled && (
    <div className="flex justify-center p-4">
        <div className="text-2xl font-bold">
        <Monitoring />
        </div>
    </div>
    )}

      <div className="max-w-xl mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">Mock Quiz</h1>
        <form>
          {questions.map((q) => (
            <div key={q.id} className="mb-6">
            <p className="font-medium mb-2">{q.id}. {q.question}</p>
            {q.options.map((opt, index) => (
              <div key={index} className="flex items-center mb-1">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  id={`q${q.id}-opt${index}`}
                  className="mr-2"
                />
                <label htmlFor={`q${q.id}-opt${index}`}>{opt}</label>
              </div>
            ))}
          </div>
        ))}
      </form>
    </div>
    </>
  );
};

export default MockQuiz;
MockQuiz.layout = null;
