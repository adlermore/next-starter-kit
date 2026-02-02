'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import api from '@/utils/api'
import { APIURLIMG } from '@/utils/constants'
import ContactForm from './ContactForm'

function Services() {
  return <><ContactForm /></>
  const [categories, setCategories] = React.useState<Array<{ id: number; name: string; image_path: string , description: string }>>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    async function getServices() {
      try {
        const data = await api.get("/getCategories");
        setCategories(data as Array<{ id: number; name: string; image_path: string , description: string }>);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false)
      }
    }

    getServices();
  }, []);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="w-full relative h-100 overflow-hidden rounded animate-pulse bg-gray-200 flex flex-col justify-end">
      <div className="absolute inset-0 bg-gray-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="h-8 w-2/3 bg-gray-400 rounded" />
      </div>
    </div>
  )

  return (
    <div className='grid xl:grid-cols-4 md:grid-cols-3  grid-cols-2 sm:gap-6.25 gap-3'>
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        : categories.map((category) => (
          <Link
            key={category.id}
            href={`/services?service=service_${category.id}`}
            className="group w-full relative sm:h-100 h-50 overflow-hidden"
          >
            <div className="w-full h-full relative">
              <Image
                src={APIURLIMG + category.image_path}
                alt={category.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 sm:p-6 p-3 text-center text-white transition-all duration-500">
              {/* Category name */}
              <div className="font-medium uppercase sm:text-2xl text-md transform transition-transform duration-500 group-hover:-translate-y-4">
                {category.name}
              </div>

              <div
                className="opacity-0 max-h-0 overflow-hidden  mt-2  elipses10 transition-all duration-500 group-hover:opacity-100 group-hover:max-h-60"
                dangerouslySetInnerHTML={{ __html: category.description }}
              />
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Services