
import QuestionForm from "@/components/QuestionForm";

export default function FormPage(){
    return (
        <div className="flex h-screen ">
            <div className="w-full flex flex-col flex-1 bg-gradient-to-r from-[#7eff84] to-[#4EAAFF] justify-center items-center">
                <div className="flex font-black text-black text-[66px] leading-none pb-9">
                    COVID-19<br/>Risk Assessment
                </div>
                <div className="flex flex-col gap-5 font-light text-[32px] text-black pl-[54px] leading-snug">
                    <div>Do you think you are you at risk of contracting COVID-19?</div>
                    <div>Take this survey to find out and find<br/> ways to minimize your exposure</div>
                </div>
            </div>

            <div className="flex flex-1 bg-white w-full ">
                <QuestionForm/>
            </div>
            {/* #7eff84 #80ff85 */}
        </div>
    )
}