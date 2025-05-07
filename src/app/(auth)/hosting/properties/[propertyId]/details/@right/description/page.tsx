import React from "react";

import PropertyDescriptionForm from "./_components/PropertyDescriptionForm";

import { getPropertyDescription } from "@/actions/property/get-property-by-id";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ArrowLeft } from "lucide-react";

async function DescriptionPage({ params }: { params: { propertyId: string } }) {
    const data = await getPropertyDescription(params.propertyId);

    return (
			<section className='flex flex-col h-[calc(100vh-68px)] w-full px-6 airBnbDesktop:overflow-x-hidden airBnbDesktop:overflow-y-auto airBnbTablet:px-10 min-[1128px]:px-20 airBnbBigDesktop:px-0'>
				<header className='airBnbDesktop:mx-auto airBnbDesktop:sticky airBnbDesktop:z-[3] airBnbDesktop:top-0 airBnbDesktop:grow-0 airBnbDesktop:shrink-0 airBnbDesktop:basis-auto airBnbDesktop:pb-5 airBnbDesktop:pt-11 bg-background'>
					<div className='mt-3 flex items-center justify-between w-full px-10 py-6 airBnbDesktop:gap-6 airBnbDesktop:w-[464px] airBnbDesktop:p-0 airBnbBigDesktop:w-[800px] min-[1128px]:w-[512px]'>
						<div className='flex justify-center '>
							<Link
								href={`/hosting/properties`}
								className={cn(
									buttonVariants({ variant: 'ghost', size: 'icon' }),
									'rounded-full airBnbDesktop:hidden'
								)}
							>
								<ArrowLeft className='h-5 w-5' />
							</Link>
							<h2 className='m-0 p-0 text-[1em]'>
								<span className='p-1 px-0 text-[1.5rem] font-normal'>
									Description
								</span>
							</h2>
						</div>
					</div>
				</header>

				<div className='flex grow py-6 airBnbDesktop:pt-0 airBnbDesktop:pb-10'>
					<div className='airBnbDesktop:mx-auto airBnbBigDesktop:w-[800px] min-[1128px]:w-[512px] airBnbDesktop:w-[464px] '>
						<PropertyDescriptionForm
							description={data.description}
							propertyId={params.propertyId}
						/>
					</div>
				</div>
			</section>
		);
}

export default DescriptionPage;
