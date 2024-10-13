import React from 'react';
import { DiceType, DiceRoll } from '../types';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface DiceRollerProps {
  onRoll: (rolls: DiceRoll[]) => void;
}

const diceTypes: DiceType[] = ['d4', 'd6', 'd8', 'd10', 'd10', 'd12', 'd20'];

const DiceRoller: React.FC<DiceRollerProps> = ({ onRoll }) => {
  const rollDice = () => {
    const rolls = diceTypes.map((type) => ({
      type,
      value: Math.floor(Math.random() * parseInt(type.slice(1))) + 1,
    }));
    onRoll(rolls);
  };

  const getDiceIcon = (type: DiceType) => {
    switch (type) {
      case 'd4':
        return <Dice1 className="w-6 h-6" />;
      case 'd6':
        return <Dice2 className="w-6 h-6" />;
      case 'd8':
        return <Dice3 className="w-6 h-6" />;
      case 'd10':
        return <Dice4 className="w-6 h-6" />;
      case 'd12':
        return <Dice5 className="w-6 h-6" />;
      case 'd20':
        return <Dice6 className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={rollDice}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Roll Dice
      </button>
      <div className="flex mt-2 space-x-2">
        {diceTypes.map((type, index) => (
          <div key={index} className="flex items-center">
            {getDiceIcon(type)}
            <span className="ml-1">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiceRoller;