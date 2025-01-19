import Link from "next/link";
import Image from "next/image";

const Header = (props: {

}) => {
  return (
    <header className="w-full fixed left-0 top-0  bg-black p-2">
      <div className="mx-10">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
            priority
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
