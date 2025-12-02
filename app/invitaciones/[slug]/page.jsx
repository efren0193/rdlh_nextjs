import { getInvitationBySlug } from "@/app/services/invitations";

export default async function InvitacionPage({ params }) {
  const data = await getInvitationBySlug(params.slug);

  if (!data) return <p>Cargando...</p>;
  if (!data.url) return <p>Invitación no encontrada</p>;

  return (
    <div className="w-full min-h-screen p-2 bg-gray-100">
      <iframe
        src={data.url}
        className="w-full h-screen rounded-xl shadow-xl border"
        allow="fullscreen"
      />
    </div>
  );
}
