import {Button} from "@mui/material";

export default function MenageButtons() {

    const buttonLabels = ['Anuluj', 'Edytuj dane', 'Przybycie', 'Brak przybycia'];

    return (
        <div className="grid grid-cols-2 gap-x-5">
            {buttonLabels.map(label => (
                <Button
                    key={label}
                    variant="filled"
                >
                    {label}
                </Button>
            ))}
        </div>
    )
}