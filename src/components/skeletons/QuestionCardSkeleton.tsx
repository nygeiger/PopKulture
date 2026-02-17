import qcSkeleStyles from "./QuestionCardSkeleton.module.css";
import qcStyles from "../question-card/QuestionCard.module.css";

export default function QuestionCardSkeleton() {
  return (
    <div className={`${qcStyles.questionCard} ${qcSkeleStyles.skeletonVariant}`}>
      <div className={`${qcSkeleStyles.skeletonElement} ${qcSkeleStyles.questionSkeleton}`}></div>
      <div className={qcSkeleStyles.skeletonAnswerSection}>
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className={`${qcSkeleStyles.skeletonElement} ${qcSkeleStyles.answerSkeleton}`}></div>
        ))}
      </div>
    </div>
  );
}
