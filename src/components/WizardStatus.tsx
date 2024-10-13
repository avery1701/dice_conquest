import React from 'react';
import { Wizard } from '../types';
import { Wand2 } from 'lucide-react';

interface WizardStatusProps {
  wizard: Wizard;
}

const WizardStatus: React.FC<WizardStatusProps> = ({ wizard }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
      <Wand2 className="w-8 h-8 mr-4 text-purple-600" />
      <div>
        <h2 className="text-2xl font-bold mb-2">Wizard</h2>
        <p className="text-lg">
          Life Points: {wizard.lifePoints} / {wizard.maxLifePoints}
        </p>
      </div>
    </div>
  );
};

export default WizardStatus;