import { useState } from 'react';
import { Statistics } from './statistics';
import { FeedbackOptions } from './button';
import { Section } from './section';
import { Notification } from './notification';

export const ContainerWidget = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countFeedback = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        break;
    }
  };

    const countTotalFeedback = () => {
      return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return Math.round((good * 100) / total);
  };


  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={countFeedback}
          options={['good', 'neutral', 'bad']}
        />
      </Section>
      <Section title="Statistics">
        { countTotalFeedback() > 0 && (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
        {countTotalFeedback() === 0 && <Notification message="There is no feedback" />}
      </Section>
    </div>
  );
};
