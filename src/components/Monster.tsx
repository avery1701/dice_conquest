import React from 'react';
import { Monster as MonsterType } from '../types';

interface MonsterProps {
  monster: MonsterType;
  onAssignDamage: () => void;
  canAssignDamage: boolean;
}

const Monster: React.FC<MonsterProps> = ({ monster, onAssignDamage, canAssignDamage }) => {
  const isDead = monster.lifePoints <= 0;

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${isDead ? 'opacity-50' : ''}`}>
      <h3 className="text-xl font-bold mb-2">{monster.name}</h3>
      <p className="mb-2">Life Points: {monster.lifePoints}</p>
      <p className="mb-2">Damage Rating: {monster.damageRating}</p>
      {isDead ? (
        <p className="text-red-600 font-bold">This creature has died!</p>
      ) : (
        <button
          onClick={onAssignDamage}
          disabled={!canAssignDamage}
          className={`mt-2 px-3 py-1 rounded ${
            canAssignDamage
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Assign Damage
        </button>
      )}
    </div>
  );
};

export default Monster;