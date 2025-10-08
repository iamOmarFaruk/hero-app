import { FaGooglePlay, FaApple } from 'react-icons/fa'

function Hero() {
  return (
    <section className="relative bg-[#F5F5F5]">

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-0 pt-24 text-center md:px-10">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
          <span className="block text-[#0F172A]">We Build</span>
          <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
            Productive
          </span>{' '}
          <span className="text-[#0F172A]">Apps</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting.
          Our goal is to turn your ideas into digital experiences that truly make an impact.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-900 shadow-[0_28px_60px_-30px_rgba(79,70,229,0.8)] transition duration-300 hover:-translate-y-0.5 hover:border-[#6366F1] hover:shadow-[0_32px_75px_-30px_rgba(99,102,241,0.8)]"
          >
            <FaGooglePlay className="text-xl text-[#22C55E] transition duration-300 group-hover:text-[#16A34A]" />
            Google Play
          </a>

          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-900 shadow-[0_28px_60px_-30px_rgba(15,23,42,0.6)] transition duration-300 hover:-translate-y-0.5 hover:border-[#0EA5E9] hover:shadow-[0_32px_75px_-30px_rgba(14,165,233,0.65)]"
          >
            <FaApple className="text-2xl text-slate-700 transition duration-300 group-hover:text-[#0F172A]" />
            App Store
          </a>
        </div>

        <div className="mt-14 flex w-full justify-center">
          <img
            src="/assets/hero.png"
            alt="Hero app preview"
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero