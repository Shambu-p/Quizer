import Exam from "./Exam";
import Question from "./Question";
import ExamQuestionCombination from "./ExamQuestionCombination";

export default interface ExamQuestion {
    exam: Exam
    questions: ExamQuestionCombination[]
}