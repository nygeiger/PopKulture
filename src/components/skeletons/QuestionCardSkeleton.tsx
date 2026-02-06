import "./QuestionCardSkeleton.css";

export default function QuestionCardSkeleton() {
  return (
    <div className="questionCard skeletonVariant">
      <div className="skeletonElement questionSkeleton"></div>
      <div className="skeletonAnswerSection">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="skeletonElement answerSkeleton"></div>
        ))}
      </div>
    </div>
  );
}
