

import { Bookmark, Check, MessageSquare, SquareTerminal, TrendingUp, Upload, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { handleSmoothScroll } from "../services/userService";

export const Home = () => {
    const navigate = useNavigate();

    function handleRedirect() {
        navigate('/sign-in');
    }

    return (

        <>
            <section className="px-6 py-16 lg:px-8 bg-[#1C1C1C]" id="home">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    <div className="space-y-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-white">Your Personal AI</span>
                            <br />
                            <span className="text-[#6C5CE7]">Knowledge</span>
                            <br />
                            <span className="text-[#6C5CE7]">Assistant</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-lg">
                            Transform any content into an interactive knowledge base. Add documents, URLs, tweets, or YouTube videos
                            and chat with your personalized AI assistant.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="rounded-md bg-[#6C5CE7] px-6 py-3 text-white font-medium hover:bg-[#5A4BD1] transition-colors" onClick={handleRedirect}>
                                Try it now
                            </button>
                            <button className="rounded-md bg-gray-800 px-6 py-3 text-white font-medium hover:bg-gray-700 transition-colors">
                                <a href="#about" onClick={(e)=>handleSmoothScroll({ event: e, sectionId: "about" })} >See How it Works</a>
                            </button>
                        </div>
                        {/* <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <div className="flex items-center">
                                <Check className="h-5 w-5 text-[#6C5CE7] mr-2" />
                                No Credit Card Required
                            </div>
                            <div className="flex items-center">
                                <Check className="h-5 w-5 text-[#6C5CE7] mr-2" />
                                Cancel Anytime
                            </div>
                        </div> */}
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-1  bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75"></div>
                        <div className="relative bg-neutral-800 rounded-lg shadow-2xl p-6">
                            <div className="flex space-x-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 p-3 rounded bg-neutral-700">
                                    <Zap className="h-5 w-5 text-[#6C5CE7]" />
                                    <span className="text-gray-200">Add any URL, document or note</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 rounded bg-neutral-700">
                                    <SquareTerminal className="h-5 w-5 text-[#6C5CE7]" />
                                    <span className="text-gray-200">Chat with your knowledge base</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 rounded bg-neutral-700">
                                    <TrendingUp className="h-5 w-5 text-[#6C5CE7]" />
                                    <span className="text-gray-200">Get AI powered insights</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 lg:px-8  bg-[#252525]" id="features">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-4xl text-white font-bold mb-4">Powerful Features for Your Knowledge Base</h2>
                    <p className="text-gray-300 text-xl">Transform how you store and interact with your information</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <FeatureCard
                        icon={<Upload className="h-8 w-8 text-[#6C5CE7]" />}
                        title="Universal Import"
                        description="Import content from any source - URLs, PDFs, documents, tweets, or YouTube videos. Your knowledge, unified in one place."
                    />
                    <FeatureCard
                        icon={<MessageSquare className="h-8 w-8 text-[#6C5CE7]" />}
                        title="AI Search Interface"
                        description="Search naturally with your knowledge base. Ask questions, get summaries, and discover insights through intuitive conversations."
                    />
                    <FeatureCard
                        icon={<Bookmark className="h-8 w-8 text-[#6C5CE7]" />}
                        title="Smart Organization"
                        description="Automatically categorize and tag your content. Find exactly what you need with powerful search and filtering."
                    />
                    <FeatureCard
                        icon={<Zap className="h-8 w-8 text-[#6C5CE7]" />}
                        title="Quick Actions"
                        description="Generate summaries, extract key points, and create action items from your content with one click"
                    />

                </div>
            </section>

            <section className="px-6 py-16 lg:px-8 bg-[#1C1C1C]" id="about">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-4xl text-white font-bold mb-4">How Brainly AI Works</h2>
                    <p className="text-gray-300 text-xl">Three simple steps to your personalized AI knowledge assistant</p>
                </div>
                <div className="relative ">
                    <div className="absolute left-0 right-0 h-1 top-1/2 bg-indigo-600/30 justify-center max-w-4xl mx-72">
                    </div>
                    <div className="relative grid grid-cols-1 justify-center sm:grid-cols-3 mt-12 gap-8 max-w-7xl mx-auto">
                        <WordCard
                            number={1}
                            title={"Add Your Content"}
                            description="Import any type of content - paste URLs, upload documents, or add notes directly.
                             Support for web pages, PDFs, tweets, and YouTube videos."
                            tags={["URls", "Videos", "Notes"]}
                        />

                        <WordCard
                            number={2}
                            title={"AI Processing"}
                            description="Our AI automatically analyzes, indexes, and connects your content. Creates smart summaries and extracts key information for easy reference."
                            tags={["Analysis", "Indexing", "Summaries"]}
                        />

                        <WordCard
                            number={3}
                            title={"Chat & Discover"}
                            description="Ask questions, explore connections, and get insights from your knowledge base through natural conversation with AI."
                            tags={["Search", "Insights"]}
                        />
                    </div>

                </div>

                <div className="flex flex-row mt-14 max-w-7xl mx-auto justify-between items-center gap-8 md:gap-0 bg-neutral-800  p-8 rounded-xl  ">
                    <div className="flex flex-col gap-2 p-4 max-w-3xl">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to transform your knowledge management?</h1>
                        <p className="md:text-xl text-gray-300">Start organizing and chatting with your content in minutes. No credit card required.</p>
                    </div>
                    <div className="md:w-1/3 flex justify-end  p-4">
                        <button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300  text-lg font-semibold text-white py-4 px-8 rounded-lg " onClick={handleRedirect}>
                            Get Started Now
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home;

interface featureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface WorkCardProps {
    number: number;
    title: string;
    description: string;
    tags: string[];

}

function FeatureCard({ icon, title, description }: featureCardProps) {
    return (
        <div className="p-8 rounded-xl bg-[#1C1C1C] border border-gray-800 hover:scale-105 hover:transform transition-all duration-300">
            <div className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    )
}

function WordCard({ number, title, description, tags }: WorkCardProps) {
    return (
        <div className="bg-neutral-800  p-6 rounded-lg flex flex-col gap-4 items-center">
            <div className="text-white font-bold text-xl bg-indigo-600 rounded-full size-10 flex justify-center items-center mb-2 ">
                {number}
            </div>
            <div className="text-xl font-semibold text-white">
                {title}
            </div>
            <div className="text-gray-400 font-normal text-center">
                {description}
            </div>
            <div className="flex flex-row flex-wrap gap-2 mt-2 ">
                {tags.map((tag) => <div className="px-3 py-1 bg-neutral-700 rounded-full text-gray-300 text-sm">{tag}</div>)}

            </div>
        </div>
    )
}
