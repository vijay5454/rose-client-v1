import { AppWindow, Mail, Phone, Youtube } from "lucide-react";

const ContactDetails = () => {
  return (
    <div className="p-4 bg-primary">
      <address className="max-w-[80%] mx-auto not-italic">
        <p className="font-bold">
          Rosa Carmeli Retreat Center | Catholic Charismatic Prayer Group
        </p>
        <p>
          1 rue jean et josephine peyri
          <br />
          69120 vaulx en velin
          <br />
          lyon france
        </p>
        <p className="flex gap-3 items-center">
          <Phone />
          <a href="tel:+330766247202" className="text-blue-600 hover:underline">
            +33 07 66 24 72 02
          </a>
        </p>
        <p className="flex gap-3 items-center">
          <AppWindow />
          <a
            href="https://anthusmedia.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            anthusmedia.blogspot.com
          </a>
        </p>
        <p className="flex gap-3 items-center">
          <AppWindow />
          <a
            href="https://www.rosacarmeliretreatcenter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            www.rosacarmeliretreatcenter.com
          </a>
        </p>
        <p className="flex gap-3 items-center">
          <Youtube />
          <a
            href="https://www.youtube.com/@anthusmedia4858"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Anthus Media Youtube
          </a>
        </p>
        <p className="flex gap-3 items-center">
          <Mail />
          <a
            href="mailto:rosacarmeliretreatcenter@gmail.com"
            className="text-blue-600 hover:underline"
          >
            rosacarmeliretreatcenter@gmail.com
          </a>
        </p>
      </address>
    </div>
  );
};

export default ContactDetails;
