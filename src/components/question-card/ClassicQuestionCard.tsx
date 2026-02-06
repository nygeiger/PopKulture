import { useState } from "react";
import { QUESTIONS_INITIAL_POINTS, WRONG_ANSWER_PENALTY } from "../../lib/utils";
import type { Question } from "../../lib/definitions";
import QuestionCard, { type QuestionCardProps } from "./QuestionCard";
import QuestionCardSkeleton from "../skeletons/QuestionCardSkeleton";

type ClassicQuestionCardProps = {
    addTeamPoints: (addPoints: number) => void;
    incrementCurrTeam: () => void;
    question: Question;
    nextQuestion: () => void;
};

export default function ClassicQuestionCard(props: ClassicQuestionCardProps) {
    const [answerAward, setAnswerAward] = useState(QUESTIONS_INITIAL_POINTS);
    const showSkeleton = props.question === undefined;

    const handleAnswerClick = (isCorrectAnswer: boolean) => {
        if (isCorrectAnswer) {
            props.addTeamPoints(answerAward);
        } else {
            setAnswerAward(answerAward - WRONG_ANSWER_PENALTY);
        }
    };

    const nextQuestion = () => {
        setAnswerAward(QUESTIONS_INITIAL_POINTS);
        props.nextQuestion();
        props.incrementCurrTeam();
    }

    const questionCardProps: QuestionCardProps = { question: props.question, variant: "classic", nextQuestion, handleAnswerClick };

    return (
        <>
            {showSkeleton ? <QuestionCardSkeleton /> : <QuestionCard {...questionCardProps} />}
        </>
    );
}
