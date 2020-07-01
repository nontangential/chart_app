PREDICT
argument -> weight -> result

ADJUST
result -> difference -> learner -> weight -> ADJUST WEIGHT-> (difference - adjusted difference) -> ADJUST LEARNER



OVERSHOOT ADJUST WEIGHT
result > target 
   weight = learner(-1, weight, difference, weightLearn)

UNDERSHOOT ADJUST WEIGHT
result < target 
   weight = learner(1, weight, difference, weightLearn)

DOING WELL, ADJUST LESS
weightLearn = getDamping(damping, difference)

ADJUSTMENT MISTAKE
learner = getLearner(prevLearnerArgs, difference, learnerAdjustDamping)

OVERSHOOT/UNDERSHOOT STREAK
decrease adjust learnerAdjustDamping




NOISE FILTER
1) comparing to sector
2) not adjusting weights after news jumps - not technically predictable

CHANCE
use multiple runs with similar arguments






PERFORMANCE
use gpu.js