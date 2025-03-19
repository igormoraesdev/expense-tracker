import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBills } from "@/hooks/api/bills/useGetAllBills";
import { CategoryEnum, StatusEnum } from "@/lib/entities/bills/enum";
import {
  cn,
  formatCurrency,
  translateCategory,
  translateStatus,
} from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CategoryBadge } from "../../Dashboard/components/CategoryBadge";
export const ExpensesList = () => {
  const [page, setPage] = useState(1);
  const session = useSession();
  const { data, isLoading } = useGetAllBills(
    {
      userId: session.data?.user.userId as string,
      page,
      limit: 10,
    },
    { enabled: !!session.data?.user.userId }
  );

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white overflow-hidden relative">
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Histórico de Despesas</CardTitle>
              <CardDescription className="text-indigo-200 mt-2">
                Todas despesas cadastradas
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 w-full h-[72px]"
                >
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full bg-indigo-500/30 mr-4" />
                    <div>
                      <Skeleton className="h-4 w-12 bg-white/20 rounded mb-2" />
                      <Skeleton className="h-3 w-24 bg-indigo-200/20 rounded" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row ml-4 items-center gap-2">
                    <Skeleton className="h-6 w-16 bg-white/20 rounded" />
                    <Skeleton className="h-5 w-20 bg-white/20 rounded" />
                  </div>
                </Skeleton>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white overflow-hidden relative">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Histórico de Despesas</CardTitle>
            <CardDescription className="text-indigo-200 mt-2">
              Todas despesas cadastradas
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.bills?.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-4">
                    <CategoryBadge
                      className="text-white"
                      category={bill?.category as CategoryEnum}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">
                      {bill.description}
                    </p>
                    <p className="text-sm text-indigo-200">
                      {translateCategory(bill?.category as CategoryEnum)} •{" "}
                      {format(new Date(bill?.dueDate as Date), "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <Badge
                    className={cn(
                      "text-xs text-center w-fit",
                      bill.status === StatusEnum.Pending &&
                        "bg-yellow-500/20 text-yellow-500",
                      bill.status === StatusEnum.Paid &&
                        "bg-green-500/20 text-green-500",
                      bill.status === StatusEnum.Expired &&
                        "bg-red-500/20 text-red-500"
                    )}
                  >
                    {translateStatus(bill.status as StatusEnum)}
                  </Badge>
                  <p className="font-semibold text-indigo-100">
                    {formatCurrency(Number(bill?.amount))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            />
          </PaginationItem>
          {Array.from({ length: data?.pagination.totalPages || 0 }).map(
            (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === index + 1}
                  href="#"
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          {data?.pagination.totalPages && data?.pagination.totalPages > 3 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                if (page < (data?.pagination.totalPages || 0)) {
                  setPage(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};
