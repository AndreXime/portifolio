'use client';
import { About } from '@/content/About';
import Image from 'next/image';
import { useState } from 'react';
import { FaGithub, FaLaptopCode, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdSchool } from 'react-icons/md';

export default function Hero() {
    const [copied, setCopied] = useState(false);

    const handleEmailCopy = async () => {
        await navigator.clipboard.writeText('andreximenesa20@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="sobre" className="sm:pt-40 pt-30 pb-30">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        <Image
                            src={About.profilePicture}
                            alt="Foto profissional de André"
                            fill
                            className="rounded-full object-contain border-4 border-slate-700 shadow-lg"
                        />
                    </div>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-white mb-4">{About.salution}</h2>
                    <p
                        className="text-slate-300 text-lg leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{ __html: About.about }}
                    />
                    <div className="grid md:grid-cols-2 gap-4 justify-center md:justify-start font-bold text-blue-400">
                        <div className="flex items-center gap-3">
                            <MdSchool className=" w-7 h-7" />
                            <span className="text-slate-200">{About.tag1}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaLaptopCode className=" w-7 h-7" />
                            <span className="text-slate-200">{About.tag2}</span>
                        </div>
                        <a
                            onClick={handleEmailCopy}
                            className="relative cursor-pointer hover:text-blue-500 transition-colors flex items-center gap-3 hover:underline"
                        >
                            <MdEmail className="w-7 h-7" />
                            <span className="text-slate-200">andreximenesa20@gmail.com</span>
                            {copied && (
                                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded animate-bounce pointer-events-none">
                                    Copiado!
                                </span>
                            )}
                        </a>
                        <a
                            href={About.github}
                            aria-label="Github"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition-colors flex items-center gap-3 underline"
                        >
                            <FaGithub className="w-7 h-7" />
                            <span className="">AndreXime</span>
                        </a>
                        <a
                            href={About.linkedin}
                            aria-label="Linkedin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" hover:text-blue-500 transition-colors flex items-center gap-3 underline"
                        >
                            <FaLinkedin className="w-7 h-7" />
                            <span className="">AndreXimenesDev</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
