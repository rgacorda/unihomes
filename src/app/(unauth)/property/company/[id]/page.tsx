import LessorBusinessProfileScreen from "@/modules/property/screens/LessorBusinessProfileScreen";

export default async function inbox(companyId: number) {
    return (
        <div>
            <LessorBusinessProfileScreen companyId={companyId} />
        </div>
    );
}
