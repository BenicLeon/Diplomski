import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import '../../css/mathBackground.css';

const formulas = [
  
  { formula: '2x + 3y - 5z + 3 = 0', top: '5%', left: '10%', rotate: '-10deg' },
  { formula: 'Ax + By + Cz + D = 0', top: '90%', left: '45%', rotate: '-5deg' },
  { formula: '\\pi... \\ 4x - y + 2z = 7', top: '90%', left: '10%', rotate: '-8deg' },
  { formula: 'x + y + z = 0', top: '50%', left: '10%', rotate: '20deg' },

  
  { formula: '\\vec{r} = \\vec{a} + t \\vec{b}', top: '25%', left: '80%', rotate: '15deg' },
  { formula: '\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c}', top: '5%', left: '60%', rotate: '-15deg' },
  { formula: 'x = x_0 + at', top: '30%', left: '15%', rotate: '-30deg' },

  { formula: 'd = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}', top: '60%', left: '12%', rotate: '-25deg' },
  { formula: 'd = \\frac{|\\vec{AP} \\cdot \\vec{n}|}{|\\vec{n}|}', top: '68%', left: '18%', rotate: '10deg' },

  { formula: '\\cos\\theta = \\frac{\\vec{n_1} \\cdot \\vec{n_2}}{|\\vec{n_1}||\\vec{n_2}|}', top: '75%', left: '90%', rotate: '20deg' },
  { formula: '\\sin\\alpha = \\frac{|\\vec{a} \\times \\vec{b}|}{|\\vec{a}||\\vec{b}|}', top: '10%', left: '90%', rotate: '30deg' },

  { formula: '\\vec{n} = (A, B, C)', top: '45%', left: '80%', rotate: '-15deg' },
  { formula: '\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta', top: '65%', left: '80%', rotate: '18deg' },
  { formula: '\\vec{a} \\times \\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta \\cdot \\vec{n}', top: '20%', left: '5%', rotate: '12deg' },

  { formula: 'L = \\pi_1 \\cap \\pi_2', top: '55%', left: '85%', rotate: '-12deg' },
];

const MathBackground = () => {
  return (
    <div className="math-background">
      {formulas.map((f, i) => (
        <div
          key={i}
          className="formula"
          style={{
            top: f.top,
            left: f.left,
            transform: `rotate(${f.rotate})`,
          }}
        >
          <InlineMath math={f.formula} />
        </div>
      ))}
    </div>
  );
};

export default MathBackground;
