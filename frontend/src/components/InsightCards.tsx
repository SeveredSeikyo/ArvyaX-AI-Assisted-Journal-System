export default function InsightCards({ insights }: { insights: any }) {

  return (
    <div className="grid grid-cols-3 gap-4">

      <div>
        <h3>Total Entries</h3>
        <p>{insights.totalEntries}</p>
      </div>

      <div>
        <h3>Top Emotion</h3>
        <p>{insights.topEmotion}</p>
      </div>

      <div>
        <h3>Most Used Ambience</h3>
        <p>{insights.mostUsedAmbience}</p>
      </div>

    </div>
  );
}