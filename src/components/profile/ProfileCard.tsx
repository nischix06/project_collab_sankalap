"use client";

import { motion } from "framer-motion";
import { MapPin, Link as LinkIcon, Calendar, Camera, Edit2, Hexagon } from "lucide-react";
import Image from "next/image";

interface ProfileCardProps {
  user: {
    name: string;
    role: string;
    universityName: string;
    avatar?: string;
    universityLogo?: string;
    bio?: string;
    skills?: string[];
    location?: string;
    createdAt?: string;
  };
  isOwnProfile?: boolean;
}

export default function ProfileCard({ user, isOwnProfile }: ProfileCardProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Banner */}
      <div className="h-32 md:h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
        {isOwnProfile && (
          <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all">
            <Camera className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6 relative">
        <div className="flex justify-between items-start">
          <div className="relative -mt-16 mb-4">
            <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 overflow-hidden relative shadow-lg">
              {user.avatar ? (
                <Image src={user.avatar} alt={user.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-blue-600">
                  {user.name[0]}
                </div>
              )}
            </div>
          </div>
          <div className="pt-4 flex gap-2">
            {isOwnProfile && (
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <Edit2 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">{user.name}</h1>
                <Hexagon className="w-5 h-5 text-blue-500 fill-blue-500/20" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                {user.role.replace('_', ' ').toUpperCase()} at {user.universityName}
              </p>
            </div>

            {user.bio && (
              <p className="text-slate-700 dark:text-slate-300 max-w-2xl">{user.bio}</p>
            )}

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-500 dark:text-slate-400">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {user.location}
                </div>
              )}
              <div className="flex items-center gap-1 text-blue-600 font-semibold cursor-pointer hover:underline">
                <LinkIcon className="w-4 h-4" /> 500+ Proposals
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Joined February 2024
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center p-2 shadow-sm">
                 {/* Placeholder for University Logo */}
                 <span className="text-xs font-bold text-slate-400">UNI</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                {user.universityName}
              </p>
            </div>

            <div className="flex -space-x-2 overflow-hidden">
                {[1,2,3,4].map(i => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                        U{i}
                    </div>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 ring-2 ring-white dark:ring-slate-900 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                    +12
                </div>
            </div>
            <p className="text-xs text-slate-500 font-medium cursor-pointer hover:text-blue-600">See 48 mutual connections</p>
          </div>
        </div>
      </div>
    </div>
  );
}
