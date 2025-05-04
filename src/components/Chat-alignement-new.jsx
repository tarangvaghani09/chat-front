<p className="flex justify-between gap-2 text-xs sm:text-sm">
<span className="flex max-w-[70vw] break-words">
  {chat.deletedForEveryone ? (
    chat.sender === loggedInUser ? (
      <i className="text-gray-500">You deleted this message</i>
    ) : (
      <i className="text-gray-500">This message was deleted</i>
    )
  ) : (
    chat.message
  )}
</span>

<div className="flex justify-end items-center mt-1 text-xs text-gray-500">
  <span>
    {new Date(chat.timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
    })}
  </span>
  {chat.edited && (
    <span className="ml-2 text-[11px] text-gray-500 italic">edited</span>
  )}
</div>

</p>