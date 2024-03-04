const  statusMessages = {
    ACCEPTED: { message: 'Zaakceptowano', className: 'text-green-600' },
    CANCEL_REQUEST: { message: 'Żądanie anulowania', className: 'text-red-600' },
    CANCEL_REJECTED: { message: 'Odrzucono żądanie anulowania', className: 'text-red-600' },
    CANCEL_ACCEPTED: { message: 'Zaakceptowano żądanie anulowania', className: 'text-green-600' },
    CANCELED: { message: 'Anulowano przez hotel', className: 'text-red-600' },
    ARRIVED: { message: 'Rezerwacja zrealizowana', className: 'text-green-600' },
    NOT_ARRIVED: { message: 'Rezerwacja niezrealizowana', className: 'text-red-600' }
};

export {statusMessages}
