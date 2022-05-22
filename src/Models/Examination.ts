import ExamResult from "./ExamResult";
import Exam from "./Exam";
import ExamResultQuestion from "./ExamResultQuestion";

export default interface Examination {
    result: ExamResult,
    exam: Exam,
    questions: ExamResultQuestion[]
}