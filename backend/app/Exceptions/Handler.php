<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class Handler extends ExceptionHandler
{
    protected function level(): string
    {
        return 'production';
    }

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e): Response
    {
        if ($request->expectsJson()) {
            return $this->prepareJsonResponse($request, $e);
        }

        return parent::render($request, $e);
    }

    private function prepareJsonResponse($request, Throwable $e): JsonResponse
    {
        $status = $this->isHttpException($e) ? $e->getStatusCode() : Response::HTTP_INTERNAL_SERVER_ERROR;

        if ($e instanceof ValidationException) {
            return response()->json([
                'message' => 'تعذر حفظ البيانات. يرجى مراجعة الحقول والمحاولة مرة أخرى.',
                'errors' => $e->errors(),
            ], $status);
        }

        $message = match ($status) {
            Response::HTTP_NOT_FOUND => 'العنصر المطلوب غير موجود.',
            Response::HTTP_UNAUTHORIZED => 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.',
            Response::HTTP_FORBIDDEN => 'ليست لديك صلاحية لتنفيذ هذا الإجراء.',
            Response::HTTP_TOO_MANY_REQUESTS => 'تم إرسال طلبات كثيرة. يرجى الانتظار ثم المحاولة مرة أخرى.',
            default => $e->getMessage() ?: 'حدث خطأ غير متوقع.',
        };

        return response()->json([
            'message' => $message,
        ], $status);
    }
}
