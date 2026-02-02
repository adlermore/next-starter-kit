'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import PhoneField from "../ui/PhoneField";
import SpinerLoader from "../ui/SpinerLoadier";
import InputField from "../ui/InputField";
import api from "@/utils/api";

const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string()
    .required("Please enter email address")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid Email Address"
    ),
  phone: yup
    .string()
    .required('Phone is required')
    .min(14, "Invalid phone number")
    .matches(phoneRegExp, 'Invalid phone number'),
  message: yup.string().required("Message is required"),
});

type ContactFormInputs = yup.InferType<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormInputs>({
    resolver: yupResolver(contactSchema),
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (values) => {
    const payload = {
      full_name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    };

    try {
      const res = await api.post('/contact', payload);
      setOpen(true);
      console.log('res__' , res);

      toast.success('success');
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white lg:p-8 contact-form">
      <form className="contact_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:text-3xl text-2xl text-siteColor font-semibold mb-2 ">Get in Touch</div>
        <div className="mb-6 text-gray-500">You can reach us anytime</div>
        <div className="flex flex-col lg:flex-row lg:space-x-2 sm:gap-6 gap-6">
          <div className="flex-1 relative">
            <InputField
              id="name"
              placeholder="Enter name"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>
          <div className="flex-1 relative">
            <InputField
              id="email"
              placeholder="Enter email"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
        </div>
        <div className="mt-6 relative">
          <PhoneField
            id="phone"
            error={errors.phone?.message}
            {...register('phone')}
            label=''
          />
        </div>
        <div className="mt-6 relative input_container">
          <textarea
            {...register("message")}
            id="message"
            placeholder="How can we help?"
            rows={4}
            className={`w-full px-3 py-2 text-sm border resize-none rounded-lg focus:outline-none border-gray-300`}
          />
          {errors.message ?
            <div className="error laptop:text-xs laptop:whitespace-nowrap">{errors.message?.message}</div>
            :
            <div className="error error-invisible laptop:text-xs laptop:whitespace-nowrap"></div>
          }
        </div>
        <div className="mt-6 flex justify-center w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-full px-8 py-2 rounded-lg flex items-center justify-center h-11.25 bg-siteColor text-white font-semibold cursor-pointer hover:opacity-70 transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? <SpinerLoader /> : "Submit"}
          </button>
        </div>
      </form>
      {open && (
        <div className="fixed inset-0 p-5 flex items-center justify-center bg-black/70 bg-opacity-40 z-999">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center max-w-lg w-full">
            <svg
              width="48px"
              height="48px"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 50 50"
              xmlSpace="preserve"
            >
              <circle cx="25" cy="25" r="25" fill="#213448 "></circle>
              <path
                fill="none"
                stroke="#FFF"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M38 15L22 33 12 25"
              ></path>
            </svg>
            <h2 className="text-xl font-medium text-center mt-4">
              Thank you for reaching out to us! Your request has been received, and our support team will be in touch with you shortly!
            </h2>
            <div className="sm:flex justify-center w-full gap-4 mt-6">
              <Link href="/" passHref className="w-full sm:w-auto">
                <button className="px-6 py-2 rounded-lg w-full  bg-siteColor duration-300 cursor-pointer text-white hover:opacity-70 font-semibold">
                  Go To Homepage
                </button>
              </Link>
              <button onClick={() => setOpen(false)} className="px-6 w-full mt-5 sm:mt-0 sm:w-fit duration-300 cursor-pointer py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold text-gray-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}