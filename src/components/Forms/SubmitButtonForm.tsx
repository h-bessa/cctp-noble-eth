import { CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const SubmitButtonForm = ({
                              isFormValid,
                              loading,
                              success,
                              label,
                              buttonClicked
                          }: {
    isFormValid: boolean;
    loading?: boolean;
    success?: boolean;
    label: string;
    buttonClicked?: boolean;
}) => {
    const baseClasses = "cursor-pointer disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50";

    const colorClasses = label === "BURN"
        ? "bg-orange-500 hover:bg-orange-700"
        : "bg-green-500 hover:bg-green-700";

    return (
        <button
            className={`${baseClasses} ${colorClasses}`}
            type="submit"
            disabled={!isFormValid || loading}
        >
            {loading && <CircularProgress size={24} color="inherit" />}
            {!loading && success && buttonClicked && (
                <>
                    <span className="mr-2">Transaction sent !</span>
                    <CheckCircleIcon />
                </>
            )}
            {!loading && !success && buttonClicked && (
                <>
                    <span className="mr-2">Error during process</span>
                    <CancelIcon />
                </>
            )}
            {(!loading || (loading && !success)) && !buttonClicked && label}
        </button>
    );
}

export default SubmitButtonForm;
