import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RechargePageProps {
  user?: {
    name: string;
    role: "admin" | "collaborator" | "customer" | "guest";
    avatar?: string;
    balance?: number;
  };
}

const RechargePage: React.FC<RechargePageProps> = ({
  user = {
    name: "Nguyen Van A",
    role: "customer",
    balance: 500000,
  },
}) => {
  const [amount, setAmount] = useState<number | "">("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const quickAmounts = [50000, 100000, 200000, 500000, 1000000];
  const transactionId = `TX${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`;

  // Mock bank account information
  const bankInfo = {
    accountName: "CHOTROIIMMO COMPANY",
    accountNumber: "19035272837465",
    bankName: "Techcombank",
  };

  const transferContent = `NAP ${user.name} ${transactionId}`;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setAmount("");
    } else {
      const numValue = parseInt(value.replace(/[^0-9]/g, ""));
      setAmount(isNaN(numValue) ? 0 : numValue);
    }
  };

  const handleQuickAmountSelect = (value: number) => {
    setAmount(value);
  };

  const handleContinue = () => {
    if (amount && amount >= 10000) {
      setShowQR(true);
    }
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate payment verification
    setTimeout(() => {
      setIsProcessing(false);
      // Here you would update the user's balance
      alert("Nạp tiền thành công!");
      setShowQR(false);
      setAmount("");
    }, 2000);
  };

  const formatCurrency = (value: number | string) => {
    if (value === "") return "";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(typeof value === "string" ? parseInt(value) : value)
      .replace("₫", "đ");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Generate QR code data
  const qrData = JSON.stringify({
    bankName: bankInfo.bankName,
    accountNumber: bankInfo.accountNumber,
    amount: amount,
    content: transferContent,
  });

  return (
    <MainLayout user={user}>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Nạp tiền</h1>

        <Card className="mb-6 border-green-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Số dư hiện tại</CardTitle>
            <CardDescription>
              Số dư khả dụng trong tài khoản của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(user.balance || 0)}
            </p>
          </CardContent>
        </Card>

        {!showQR ? (
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Chọn số tiền muốn nạp</CardTitle>
              <CardDescription>Số tiền tối thiểu là 10.000đ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium mb-1"
                >
                  Số tiền
                </label>
                <Input
                  id="amount"
                  type="text"
                  value={amount === "" ? "" : formatCurrency(amount)}
                  onChange={handleAmountChange}
                  placeholder="Nhập số tiền"
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Chọn nhanh
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((value) => (
                    <Button
                      key={value}
                      variant={amount === value ? "default" : "outline"}
                      onClick={() => handleQuickAmountSelect(value)}
                      className={amount === value ? "" : "hover:bg-primary/5"}
                    >
                      {formatCurrency(value)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleContinue}
                disabled={!amount || amount < 10000}
                className="w-full"
                size="lg"
              >
                Tiếp tục
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Thông tin thanh toán</CardTitle>
              <CardDescription>Quét mã QR để thanh toán</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                {/* Real QR code */}
                <QRCodeSVG
                  value={qrData}
                  size={240}
                  level="H"
                  includeMargin
                  className="mx-auto"
                />
              </div>

              <div className="w-full space-y-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <h3 className="font-medium mb-2">Thông tin chuyển khoản</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Ngân hàng:
                      </span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">
                          {bankInfo.bankName}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  copyToClipboard(bankInfo.bankName, "bank")
                                }
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {copied === "bank" ? "Đã sao chép!" : "Sao chép"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Tên tài khoản:
                      </span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">
                          {bankInfo.accountName}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  copyToClipboard(bankInfo.accountName, "name")
                                }
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {copied === "name" ? "Đã sao chép!" : "Sao chép"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Số tài khoản:
                      </span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">
                          {bankInfo.accountNumber}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  copyToClipboard(
                                    bankInfo.accountNumber,
                                    "account",
                                  )
                                }
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {copied === "account"
                                ? "Đã sao chép!"
                                : "Sao chép"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Số tiền:
                      </span>
                      <div className="flex items-center">
                        <span className="font-medium text-green-600 mr-2">
                          {formatCurrency(amount)}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  copyToClipboard(amount.toString(), "amount")
                                }
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {copied === "amount"
                                ? "Đã sao chép!"
                                : "Sao chép"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Nội dung chuyển khoản:
                      </span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2 text-orange-600">
                          {transferContent}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  copyToClipboard(transferContent, "content")
                                }
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {copied === "content"
                                ? "Đã sao chép!"
                                : "Sao chép"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing
                  ? "Đang kiểm tra thanh toán..."
                  : "Tôi đã chuyển khoản"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowQR(false)}
                disabled={isProcessing}
                className="w-full"
              >
                Quay lại
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default RechargePage;
