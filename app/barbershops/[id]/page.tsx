import { db } from "@/app/_lib/prisma";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceItem from "@/app/_components/service-item";
import PhoneItem from "@/app/_components/phone-item";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import SidebarSheet from "@/app/_components/sidebar-sheet";

interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    include: { services: true, phones: true },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          className="h-full w-full object-cover"
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
          fill
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* INFO */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>

        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (889 avaliações)</p>
        </div>
      </div>

      {/* DESCRICAO */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">SOBRE NÓS</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      {/* SERVICOS */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">SERVIÇOS</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={JSON.parse(JSON.stringify(service))}
            />
          ))}
        </div>
      </div>

      {/* CONTATOS */}
      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">CONTATOS</h2>
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone.phone} phone={phone.phone} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
