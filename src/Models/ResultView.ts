import ExamResult from "./ExamResult";
import Exam from "./Exam";
import ExamQuestionCombination from "./ExamQuestionCombination";

export default interface ResultView {
    result: ExamResult
    exam: Exam
    questions: ExamQuestionCombination[]
}