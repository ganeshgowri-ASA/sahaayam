import { Contact } from "@/lib/data/escalation";

interface ContactsTableProps {
  contacts: Contact[];
}

const levelLabel: Record<number, string> = {
  1: "Level 1",
  2: "Level 2",
  3: "Level 3",
};

const levelBadgeClass: Record<number, string> = {
  1: "bg-green-100 text-green-700",
  2: "bg-yellow-100 text-yellow-700",
  3: "bg-red-100 text-red-700",
};

export default function ContactsTable({ contacts }: ContactsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-blue-50 border-b border-blue-100">
            <th className="px-4 py-3 font-semibold text-blue-800 whitespace-nowrap">Level</th>
            <th className="px-4 py-3 font-semibold text-blue-800">Name</th>
            <th className="px-4 py-3 font-semibold text-blue-800 whitespace-nowrap">Landline</th>
            <th className="px-4 py-3 font-semibold text-blue-800 whitespace-nowrap">Mobile</th>
            <th className="px-4 py-3 font-semibold text-blue-800">Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.level}
              className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
            >
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${levelBadgeClass[contact.level]}`}>
                  {levelLabel[contact.level]}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-gray-800">{contact.name}</td>
              <td className="px-4 py-3">
                <a
                  href={`tel:${contact.landline.replace(/[-\s]/g, "")}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {contact.landline}
                </a>
              </td>
              <td className="px-4 py-3">
                <a
                  href={`tel:${contact.mobile}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {contact.mobile}
                </a>
              </td>
              <td className="px-4 py-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors break-all"
                >
                  {contact.email}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
