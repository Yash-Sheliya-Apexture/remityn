// not-found.tsx
import Image from "next/image";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";

export default function NotFound() {
  return (
    <>
      {/* Pass the dummy function */}
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center max-w-lg text-center">
          {/* Image */}
          <div className="mb-8">
            <Image
              src="/assets/images/construction-fence-medium@1x.webp"
              alt="Construction Barrier"
              width={300}
              height={300}
              priority
              className="md:size-72 size-40"
            />
          </div>

          {/* Title */}
          <h1 className="lg:text-3xl text-xl font-semibold text-main mb-4">
            Sorry, looks like we lost this page.
          </h1>

          {/* Subtitle */}
          <p className="text-gray font-medium mb-8 text-center">
            Let's get you back on track.
          </p>

          {/* Go to Home Button */}
          <Link
            href="/dashboard"
            className="bg-primary hover:bg-primary-hover text-secondary text-lg font-medium lg:py-3 py-2 w-full inline-block rounded-full transition-colors duration-200"
          >
            Go to Home
          </Link>

          {/* Try these tips link */}
          <div className="mt-6 flex items-center gap-2">
            <Link
              href="/helps"
              className="font-medium text-secondary underline underline-offset-4"
            >
              Try these tips
            </Link>
            <TbExternalLink className="size-6" />
          </div>
        </div>
      </div>
    </>
  );
}
