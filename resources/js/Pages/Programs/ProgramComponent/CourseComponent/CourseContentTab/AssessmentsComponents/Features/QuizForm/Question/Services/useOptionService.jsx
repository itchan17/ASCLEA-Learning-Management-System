import axios from "axios";

export default function useOptionService({ assessmentId, quizId, questionId }) {
    const addOption = async () => {
        return await axios.post(
            route("assessment.quiz-form.question.option.create", {
                assessment: assessmentId,
                quiz: quizId,
                question: questionId,
            })
        );
    };

    return { addOption };
}
