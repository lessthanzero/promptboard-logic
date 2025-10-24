import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { HelpCircle, Zap, Target } from 'lucide-react';

interface LogicNodeProps {
  id: string;
  type: 'condition' | 'action' | 'outcome';
  label: string;
  position: { x: number; y: number };
}

const LogicNode: React.FC<LogicNodeProps> = ({ type, label, position }) => {
  const getIcon = () => {
    switch (type) {
      case 'condition':
        return <HelpCircle className="w-3 h-3" />;
      case 'action':
        return <Zap className="w-3 h-3" />;
      case 'outcome':
        return <Target className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getBadgeVariant = () => {
    switch (type) {
      case 'condition':
        return 'outline' as const;
      case 'action':
        return 'secondary' as const;
      case 'outcome':
        return 'default' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <div 
      className="absolute" 
      style={{ 
        top: `${position.y}px`, 
        left: `${position.x}px`,
        zIndex: 2
      }}
    >
      <Card className="w-56 shadow-lg">
        <CardContent className="p-3">
          <Badge variant={getBadgeVariant()} className="mb-2 flex items-center gap-1">
            {getIcon()}
            {type}
          </Badge>
          <p className="text-sm text-left">{label}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogicNode;
