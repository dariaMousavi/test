import Image from 'next/image';
import Link from 'next/link';

function WelcomePage() {
  return (
    <div className={`sectionMainPages justify-center  relative`}>
      <div id="welcome-background">
        <Image
          src="/images/welcome3.jpg"
          fill={true}
          alt="Many fruits showing in the background"
          style={{ objectFit: 'cover' }}
          className="absolute rounded-lg opacity-25 "
          priority={true}
        />
      </div>
      <section className=" z-20 mt-5 flex flex-col justify-center items-center ">
        <h1 className="text-center font-semibold text-4xl">Welcome to</h1>
        <Image
          className="animate-pulse"
          src="/logo.png"
          width={256}
          height={183}
          alt="Health Boss Logo"
          priority={true}
        />
      </section>

      <section className=" z-20 mx-5 flex flex-col justify-center items-center gap-4 mt-4">
        <Link
          href="/createUser"
          className={`buttonLogin bg-mainBlack hover:scale-110 text-center`}
        >
          Create an account
        </Link>
        <Link
          href="/loginUser"
          className={`buttonLogin bg-mainBlack text-mainGreen hover:scale-110 text-center`}
        >
          I have an account
        </Link>
      </section>

      <h2 className=" z-20  mt-5 text-center font-semibold">
        Be the{' '}
        <span className="font-semibold border-b-2 border-mainGreen">BOSS</span>
      </h2>
      <h2 className="z-20 text-center font-semibold">of your health!</h2>

      <h5 className="z-20 mt-9 text-center font-bold text-xs">
        Photos by Unsplash
      </h5>
    </div>
  );
}

export default WelcomePage;
