import { MapPin, Users } from 'lucide-react';

interface PropertyInfoProps {
  title: string;
  location: string;
  owner: string;
  investors: number;
}

export default function PropertyInfo({ title, location, owner, investors }: PropertyInfoProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      
      <div className="flex items-center gap-2 mt-2 text-gray-600">
        <MapPin size={18} />
        <span>{location}</span>
      </div>

      <div className="flex items-center justify-between mt-4 py-4 border-y">
        <div>
          <p className="text-gray-600">Property Manager</p>
          <p className="font-medium">{owner}</p>
        </div>
        <div className="flex items-center gap-2">
          <Users size={18} className="text-gray-600" />
          <span>{investors} investors</span>
        </div>
      </div>
    </div>
  );
}