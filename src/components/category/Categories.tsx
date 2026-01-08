import "./Categories.css"

interface CategoryProps {
    title: string
    questions?: string[] // Probably end up being an object
}

export default function Category(props: CategoryProps) {
    return (
        <div className="category">
            {props.title}
        </div>
    )
}