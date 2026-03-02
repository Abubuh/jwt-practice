import { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [stage, setStage] = useState('intro');
  const [textIndex, setTextIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const texts = [
    'Organize your tasks with clarity',
    'Prioritize what truly matters',
    'Full control over your tasks',
    'Manage your day with focus',
    'Achieve goals step by step',
    'Keep your tasks under control',
    'Plan better, execute faster',
    'Simplify your daily workflow',
    'Turn ideas into real results',
    'Manage priorities with efficiency',
    'Transform tasks into achievements',
    'Focus on what truly matters',
    'Take control of your time',
    'Smart task management made simple',
  ];

  useEffect(() => {
    const sequence = async () => {
      setTimeout(() => {
        setStage('centered');
        setTimeout(() => {
          setStage('split');
        }, 1300);
      }, 50);
    };
    sequence();
  }, []);

  useEffect(() => {
    if (stage !== 'split') return;

    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setVisible(true);
      }, 800);
    }, 6000);
    return () => clearInterval(interval);
  }, [stage]);
  return (
    <section className="min-h-screen  flex items-center justify-center gap-16 bg-linear-to-br from-blue-100 to-purple-200 overflow-hidden">
      <div className="relative w-7xl h-112.5 flex items-center justify-center">
        {/* TODO CARD */}
        <div
          className={`
            transition-all duration-900 ease-in-out relative z-20
             ${stage === 'intro' && 'opacity-0 translate-y-4 translate-x-50'}
             ${stage === 'centered' && 'opacity-100 translate-y-0 translate-x-50'}
             ${stage === 'split' && 'opacity-100 -translate-x-20'}
          `}
        >
          <TodoCard
            todo={{title:"Finish React project",
            description :"Complete the landing animation and deploy.",
            priority :"medium",
            completed : false,
            variant :"hero"}}
            
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div
          className={`relative z-10 w-100 flex flex-col mb-10 gap-6 transition-all duration-800
           ${
             stage === 'split'
               ? 'opacity-100 translate-x-10'
               : 'opacity-0 translate-x-0'
           }
        `}
        >
          {/* TEXT CONTAINER (ALTURA FIJA) */}
          <div className="h-36 flex items-start self-center">
            <h2
              className={`font-semibold text-gray-800 text-center min-w-125 self-center text-5xl leading-snug transition-all duration-800 ease-in-out ${visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-2 blur-sm'}`}
            >
              {texts[textIndex]}
            </h2>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mx-auto">
            <Link
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              to="/login"
            >
              Login
            </Link>

            <Link className=" px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-xl shadow-md  hover:bg-blue-50 hover:scale-105 transition-all duration-30"
            to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
