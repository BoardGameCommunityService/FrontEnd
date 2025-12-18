"use client";

import ToastMessage from "@/components/common/ToastMessage";
import useToastMessage from "@/stores/useToastMessage";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  content: string;
}

interface InquiryFormProps {
  accessToken?: string;
}

export default function InquiryForm({ accessToken }: InquiryFormProps) {
  const router = useRouter();
  const { setToastMessage } = useToastMessage();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const contentValue = watch("content", "");
  const currentLength = contentValue.length;

  const createInquiry = async (inquiry: FormData) => {
    if (!accessToken) {
      throw new Error("인증이 필요합니다.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_HOST}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(inquiry),
    });

    if (!response.ok) {
      throw new Error("문의 등록 실패");
    }
    return await response.json();
  };

  const onSubmit = async (data: FormData) => {
    try {
      await createInquiry(data);
      setToastMessage("success", "문의가 등록되었습니다.");
      router.push("/mypage/inquiries/list");
    } catch (error) {
      console.error("문의 등록 에러:", error);
      setToastMessage("failure", "문의 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        {/* 문의 제목 */}
        <label htmlFor="title"></label>
        <input
          {...register("title", { required: true })}
          className="border border-[#E9E9ED] rounded-xl w-full text-sm px-3 py-[13px] mb-3 outline-none focus:border-[#161616]"
          placeholder="문의 제목을 입력해주세요."
        />

        {/* 문의 내용 */}
        <label htmlFor="content"></label>
        <textarea
          {...register("content", { required: true })}
          rows={10}
          maxLength={300}
          className="border border-[#E9E9ED] rounded-xl w-full text-sm px-3 py-[13px] outline-none focus:border-[#161616]"
          placeholder="문의 내용을 입력해주세요."
        ></textarea>

        {/* 글자수 카운팅 */}
        <div className="text-sm font-normal">
          <span className="text-[#161616] mr-[2px]">{currentLength}</span>
          <span className="text-[#767676] mr-[2px]">/</span>
          <span className="text-[#767676]">300</span>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-5 pb-10 pt-[18px] bg-white flex justify-center">
          <button
            disabled={!isValid}
            type="submit"
            className={`block text-center w-full py-[11px] rounded-[10px] max-w-[335px] ${
              isValid ? "bg-[#06E393]" : "bg-[#EEF0F7]"
            }`}
          >
            <p className="font-semibold text-sm">작성 완료</p>
          </button>
        </div>
      </form>
      <ToastMessage />
    </>
  );
}
