import React, { useState, useEffect } from 'react';
import Monster from './components/Monster';
import DiceRoller from './components/DiceRoller';
import WizardStatus from './components/WizardStatus';
import { Monster as MonsterType, DiceRoll, Wizard } from './types';

const initialMonsters: MonsterType[] = [
  { id: 1, name: 'Goblin', lifePoints: 7, maxLifePoints: 7, damageRating: 1 },
  { id: 2, name: 'Orc', lifePoints: 15, maxLifePoints: 15, damageRating: 2 },
  { id: 3, name: 'Dragon', lifePoints: 30, maxLifePoints: 30, damageRating: 3 },
];

const initialWizard: Wizard = { lifePoints: 10, maxLifePoints: 10 };

function App() {
  const [monsters, setMonsters] = useState<MonsterType[]>(initialMonsters);
  const [wizard, setWizard] = useState<Wizard>(initialWizard);
  const [diceRolls, setDiceRolls] = useState<DiceRoll[]>([]);
  const [selectedRoll, setSelectedRoll] = useState<DiceRoll | null>(null);
  const [canReroll, setCanReroll] = useState<boolean>(true);

  const handleRoll = (rolls: DiceRoll[]) => {
    setDiceRolls(rolls);
    setSelectedRoll(null);
    setCanReroll(true);
  };

  const handleSelectRoll = (roll: DiceRoll) => {
    setSelectedRoll(roll);
  };

  const handleReroll = () => {
    if (selectedRoll && canReroll) {
      const newValue = Math.floor(Math.random() * parseInt(selectedRoll.type.slice(1))) + 1;
      const newRoll = { ...selectedRoll, value: newValue };
      setDiceRolls(prevRolls =>
        prevRolls.map(roll => (roll === selectedRoll ? newRoll : roll))
      );
      setSelectedRoll(newRoll);
      setCanReroll(false);
    }
  };

  const handleAssignDamage = (monsterId: number) => {
    if (selectedRoll) {
      setMonsters(prevMonsters =>
        prevMonsters.map(monster =>
          monster.id === monsterId
            ? { ...monster, lifePoints: Math.max(0, monster.lifePoints - selectedRoll.value) }
            : monster
        )
      );
      setDiceRolls(prevRolls => prevRolls.filter(roll => roll !== selectedRoll));
      setSelectedRoll(null);
      setCanReroll(true);
    }
  };

  const resetSurvivorLifePoints = () => {
    setMonsters(prevMonsters =>
      prevMonsters.map(monster =>
        monster.lifePoints > 0 ? { ...monster, lifePoints: monster.maxLifePoints } : monster
      )
    );
  };

  const applyMonsterDamage = () => {
    const totalDamage = monsters.reduce((sum, monster) => 
      monster.lifePoints > 0 ? sum + monster.damageRating : sum, 0
    );
    setWizard(prevWizard => ({
      ...prevWizard,
      lifePoints: Math.max(0, prevWizard.lifePoints - totalDamage)
    }));
  };

  useEffect(() => {
    if (diceRolls.length === 0) {
      applyMonsterDamage();
      resetSurvivorLifePoints();
    }
  }, [diceRolls]);

  useEffect(() => {
    if (monsters.every(monster => monster.lifePoints === 0)) {
      alert('Congratulations! You have defeated all the monsters!');
    } else if (wizard.lifePoints === 0) {
      alert('Game Over! The wizard has been defeated!');
    }
  }, [monsters, wizard]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Monster Dice Game</h1>
        <WizardStatus wizard={wizard} />
        <DiceRoller onRoll={handleRoll} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {monsters.map((monster) => (
            <Monster
              key={monster.id}
              monster={monster}
              onAssignDamage={() => handleAssignDamage(monster.id)}
              canAssignDamage={!!selectedRoll && monster.lifePoints > 0}
            />
          ))}
        </div>
        {diceRolls.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Available Dice Rolls</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {diceRolls.map((roll, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectRoll(roll)}
                  className={`px-3 py-2 rounded ${
                    selectedRoll === roll
                      ? 'bg-blue-500 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {roll.type}: {roll.value}
                </button>
              ))}
            </div>
            {selectedRoll && (
              <div className="flex gap-2">
                <button
                  onClick={handleReroll}
                  disabled={!canReroll}
                  className={`px-3 py-2 rounded ${
                    canReroll
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Re-roll {selectedRoll.type}
                </button>
                <p className="text-sm text-gray-600 self-center">
                  {canReroll ? 'You can re-roll once before assigning damage.' : 'Re-roll used.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;