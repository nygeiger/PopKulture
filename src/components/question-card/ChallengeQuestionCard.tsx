import { useState } from "react";
import { QUESTIONS_INITIAL_POINTS, WRONG_ANSWER_PENALTY } from "../../lib/utils";
import type { Question } from "../../lib/definitions";
import QuestionCard, { type QuestionCardProps } from "./QuestionCard";

export type ChallengeQuestionCardProps = {
    question: Question;
    nextQuestion: () => void;
    addPoints: (addPoints: number) => void;
};

export default function ChallengeQuestionCard(props: ChallengeQuestionCardProps) {
    const [answerAward, setAnswerAward] = useState(QUESTIONS_INITIAL_POINTS);

    const handleAnswerClick = (isCorrectAnswer: boolean) => {
        if (isCorrectAnswer) {
            props.addPoints(answerAward);
        } else {
            setAnswerAward(answerAward - WRONG_ANSWER_PENALTY);
        }
    };

    const nextQuestion = () => {
        setAnswerAward(QUESTIONS_INITIAL_POINTS);
        props.nextQuestion();
    }

    const questionCardProps: QuestionCardProps = { question: props.question, nextQuestion, handleAnswerClick};

    return (
        <QuestionCard {...questionCardProps} />
    );
}
