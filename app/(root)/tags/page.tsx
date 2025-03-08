import LocalSearch from '@/components/search/LocalSearch';
import ROUTES from '@/constants/routes';
import { getTags } from '@/lib/actions/tag.action';

const Tags = async ({ searchParams }: RouteParams) => {

    const { page, pageSize,query,filter} = await searchParams;

    const { success, data, error } = await getTags({
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        query,
        filter
    });
     
    const { tags } = data || {};

    // console.log("Tags", JSON.stringify(tags, null, 2)); 

    return (
    <>
    <h1 className='h1-bold text-dark100_light900 text-3xl'>Tags</h1>

    <section className='mt-11'>
        <LocalSearch
            route={ROUTES.TAGS}
            imgSrc="/icons/search.svg"
            placeholder="Search Tags..."
            otherClasses="flex-1"
        /> 
    </section>    
    
    
    
    </>
        
    );
};

export default Tags;