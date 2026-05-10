import { getAvalableChats } from "@/services/chatsServices";

export const findUser = async (users: any[]) => {
    try {
        // Map: normalized phone number -> contact id
        const contactRef: Record<string, any> = {};
        const existingContactsIds: string[] = [];
        const contacts: string[] = [];

        // Build phone list and reference map
        users.forEach((u) => {
            const rawNumber = u?.phoneNumbers?.[0]?.number;

            if (!rawNumber) return;

            // Remove all non-digit characters
            const digits = rawNumber.replace(/\D/g, "");

            // Keep last 10 digits (Indian mobile number)
            const normalizedNumber =
                digits.length > 10 ? digits.slice(-10) : digits;

            if (!normalizedNumber) return;

            contacts.push(normalizedNumber);
            contactRef[normalizedNumber] = u;
        });

        // Remove duplicate phone numbers
        const uniqueContacts = [...new Set(contacts)];

        // Call API
        const response = await getAvalableChats(uniqueContacts.join(","));

        // API returns users that exist in your system
        const foundUsers = response?.chats || [];

        // Attach the original contact id to each matched user
        const updatedUsers = foundUsers.map((user: any) => {
            const normalizedPhone = user.phone
                ?.replace(/\D/g, "")
                .slice(-10);

            existingContactsIds.push(contactRef[normalizedPhone]?.id);
            return {
                ...user,
                deviceContact: contactRef[normalizedPhone] || null,
            };
        });

        return { updatedUsers, existingContactsIds };
    } catch (error) {
        console.error("Error finding user:", error);
        throw error;
    }
};