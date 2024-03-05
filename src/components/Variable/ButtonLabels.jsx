const ButtonLabels = [
    { name: 'ANULUJ', title: 'Anuluj rezerwacje', message: 'Czy jesteś pewien, że chcesz anulować rezerwację?', status: 'CANCELED' },
    { name: 'EDYTUJ', title: 'Edytuj dane', message: 'Czy chcesz edytować dane tej rezerwacji?', status: 'EDIT' },
    { name: 'PRZYBYCIE', title: 'Potwierdź przybycie', message: 'Czy potwierdzasz przybycie na rezerwację?', status: 'ARRIVED' },
    { name: 'BRAK PRZYBYCIA', title: 'Zgłoś brak przybycia', message: 'Czy chcesz zgłosić brak przybycia na rezerwację?', status: 'NOT_ARRIVED' },
    { name: 'Odrzuć prośbę', title: 'Odrzuć prośbę o anulowanie', message: 'Czy chcesz odzrucić prośbę o anulowanie rezerwacji?', status: 'CANCEL_REJECTED' },
    { name: 'Akceptuj prośbę', title: 'Akceptuj prośbę o anulowanie', message: 'Czy chcesz zaakceptować prośbę o anulowanie rezerwacji?', status: 'CANCEL_ACCEPTED' },
];

export default ButtonLabels;