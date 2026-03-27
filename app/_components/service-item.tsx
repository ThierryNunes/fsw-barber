"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Barbershop, BarbershopService } from "@prisma/client";
import { formatPrice } from "../_constants/constants";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { format, set } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return;
      // ATUALIZANDO A DATA COM HORARIO
      const hour = Number(selectedTime.split(":")[0]);
      const minute = Number(selectedTime.split(":")[1]);
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      });

      await createBooking({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (data?.user as any).id,
        serviceId: service.id,
        date: newDate,
      });

      toast.success("Reserva criada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar reserva!");
    }
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* ESQUERDA */}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] rounded-lg">
          <Image
            src={service.imageUrl}
            alt={service.name}
            className="h-full w-full rounded-lg object-cover"
            fill
          />
        </div>
        {/* DIREITA */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {formatPrice(Number(service.price))}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle className="border-b border-solid px-5 pb-5 text-left">
                    Fazer Reserva
                  </SheetTitle>
                </SheetHeader>

                {/* CALENDARIO */}
                <div className="border-b border-solid py-5">
                  <Calendar
                    className="w-full capitalize"
                    mode="single"
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    locale={ptBR}
                  />
                </div>

                {/* HORARIOS */}
                {selectedDay && (
                  <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => (
                      <Button
                        className="rounded-full"
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {/* RESERVA */}
                {selectedTime && selectedDay && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="text-sm font-bold">
                            {formatPrice(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <p className="text-sm">{selectedTime}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className="mt-5 px-5">
                  <SheetClose asChild>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
