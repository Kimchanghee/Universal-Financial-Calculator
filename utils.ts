// Function to add thousand separators for display
export const formatForDisplay = (value: string): string => {
    if (!value) return '';

    const parts = value.split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Remove existing commas before re-formatting
    integerPart = integerPart.replace(/,/g, '');

    // Add new commas
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return integerPart + decimalPart;
};

// Function to remove commas and non-numeric characters for calculation
export const parseForCalculation = (value: string): string => {
    // Allow only digits and one decimal point
    return value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
};
